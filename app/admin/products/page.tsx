'use client';

import React, { useState } from 'react';
import { products } from "@/lib/products";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminProductPage() {
  const productList = Object.values(products);
  const [open, setOpen] = useState(false);
  const [thumbnails, setThumbnails] = useState([{ id: '', img: '', alt: '' }]);
  const [sizes, setSizes] = useState([{ id: '', label: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: '',
    mainImage: '',
    colors: '',
    tagline: '',
    environmentalInfo: '',
    description: '',
    colorName: '',
    styleCode: '',
    madeIn: '',
    isNew: false,
    isBestSeller: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const addThumbnailField = () => {
    setThumbnails([...thumbnails, { id: '', img: '', alt: '' }]);
  };

  const removeThumbnailField = (index: number) => {
    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);
    setThumbnails(newThumbnails);
  };

  const handleThumbnailChange = (index: number, field: string, value: string) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = { ...newThumbnails[index], [field]: value };
    setThumbnails(newThumbnails);
  };

  const addSizeField = () => {
    setSizes([...sizes, { id: '', label: '' }]);
  };

  const removeSizeField = (index: number) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = (index: number, field: string, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the product data
      const productData = {
        ...formData,
        thumbnails: thumbnails.filter(thumb => thumb.img && thumb.id), // Filter out empty thumbnails
        sizes: sizes.filter(size => size.label && size.id), // Filter out empty sizes
        colors: parseInt(formData.colors) || 1,
        price: formData.price.startsWith('฿') ? formData.price : `฿${formData.price}`
      };

      // Send to your API endpoint
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

     // const result = await response.json();

     toast.success("Product updated successfully!");

      // Reset form and close dialog
      setFormData({
        name: '',
        subtitle: '',
        price: '',
        mainImage: '',
        colors: '',
        tagline: '',
        environmentalInfo: '',
        description: '',
        colorName: '',
        styleCode: '',
        madeIn: '',
        isNew: false,
        isBestSeller: false
      });
      setThumbnails([{ id: '', img: '', alt: '' }]);
      setSizes([{ id: '', label: '' }]);
      setOpen(false);

      // TODO: Refresh the product list
      // You might want to add state management or refetch logic here

    } catch {
      toast.error("Product updated successfully!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 py-5" variant="outline">+ Create</Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input 
                placeholder="Subtitle" 
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
              <Input 
                placeholder="Price (e.g. 5900)" 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <Input 
                placeholder="Main Image URL" 
                name="mainImage"
                value={formData.mainImage}
                onChange={handleInputChange}
                required
              />
              <Input 
                placeholder="Color Count (e.g. 1)" 
                type="number" 
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
              />
              <Input 
                placeholder="Tagline" 
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
              />
              
              <Input 
                placeholder="Color Name" 
                name="colorName"
                value={formData.colorName}
                onChange={handleInputChange}
              />
              
              <Input 
                placeholder="Made In" 
                name="madeIn"
                value={formData.madeIn}
                onChange={handleInputChange}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label htmlFor="isNew">New Product</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isBestSeller"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label htmlFor="isBestSeller">Best Seller</label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Thumbnail Images</h3>
                <Button type="button" variant="outline" size="sm" onClick={addThumbnailField}>
                  Add Thumbnail
                </Button>
              </div>
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 items-end">
                  <Input
                    placeholder="Thumbnail ID"
                    value={thumbnail.id}
                    onChange={(e) => handleThumbnailChange(index, 'id', e.target.value)}
                  />
                  <Input
                    placeholder="Image URL"
                    value={thumbnail.img}
                    onChange={(e) => handleThumbnailChange(index, 'img', e.target.value)}
                  />
                  <Input
                    placeholder="Alt Text"
                    value={thumbnail.alt}
                    onChange={(e) => handleThumbnailChange(index, 'alt', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="col-span-3"
                    onClick={() => removeThumbnailField(index)}
                    disabled={thumbnails.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Available Sizes</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSizeField}>
                  Add Size
                </Button>
              </div>
              {sizes.map((size, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 items-end">
                  <Input
                    placeholder="Size ID"
                    value={size.id}
                    onChange={(e) => handleSizeChange(index, 'id', e.target.value)}
                  />
                  <Input
                    placeholder="Size Label (e.g. US 6)"
                    value={size.label}
                    onChange={(e) => handleSizeChange(index, 'label', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="col-span-2"
                    onClick={() => removeSizeField(index)}
                    disabled={sizes.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            
            <Textarea 
              placeholder="Description" 
              className="w-full"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <table className="w-7xl border-collapse border text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">NAME</th>
            <th className="p-2">PRICE</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2 space-x-2">
                <button className="px-3 py-1 bg-white border text-sm rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}