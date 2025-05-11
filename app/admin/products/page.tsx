'use client'
import React, { useState, useEffect } from 'react';
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

// Type definitions
interface ThumbnailType {
  img: string;
  alt: string;
}

interface SizeType {
  label: string;
}

interface ProductType {
  id?: string | number; // Only needed for display/reference
  name: string;
  subtitle?: string;
  price: number;
  mainImage: string;
  colors?: number | string[];
  tagline?: string;
  environmentalInfo?: string;
  description?: string;
  colorName?: string;
  styleCode?: string;
  madeIn?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  thumbnails?: ThumbnailType[];
  sizes?: SizeType[];
}

interface FormDataType {
  name: string;
  subtitle: string;
  price: number;
  mainImage: string;
  tagline: string;
  environmentalInfo: string;
  description: string;
  colorName: string;
  styleCode: string;
  madeIn: string;
  isNew: boolean;
  isBestSeller: boolean;
}

export default function ProductsTable() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailType[]>([{ img: '', alt: '' }]);
  const [sizes, setSizes] = useState<SizeType[]>([{ label: '' }]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    subtitle: '',
    price: 0,
    mainImage: '',
    tagline: '',
    environmentalInfo: '',
    description: '',
    colorName: '',
    styleCode: '',
    madeIn: '',
    isNew: false,
    isBestSeller: false
  });

  // Fetch products from API with combined table data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('http://localhost:1337/getSneakers');
        
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        
        const data = await response.json();
        setProductList(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const addThumbnailField = (): void => {
    setThumbnails([...thumbnails, { img: '', alt: '' }]);
  };

  const removeThumbnailField = (index: number): void => {
    const newThumbnails = [...thumbnails];
    newThumbnails.splice(index, 1);
    setThumbnails(newThumbnails);
  };

  const handleThumbnailChange = (index: number, field: keyof ThumbnailType, value: string): void => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = { ...newThumbnails[index], [field]: value };
    setThumbnails(newThumbnails);
  };

  const addSizeField = (): void => {
    setSizes([...sizes, { label: '' }]);
  };

  const removeSizeField = (index: number): void => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = (index: number, field: keyof SizeType, value: string): void => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const startEditing = (product: ProductType): void => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      subtitle: product.subtitle || '',
      price: product.price || 0,
      mainImage: product.mainImage || '',
      tagline: product.tagline || '',
      environmentalInfo: product.environmentalInfo || '',
      description: product.description || '',
      colorName: product.colorName || '',
      styleCode: product.styleCode || '',
      madeIn: product.madeIn || '',
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false
    });
    
    // Set thumbnails if they exist
    if (product.thumbnails && product.thumbnails.length > 0) {
      // Convert thumbnails to match our simplified structure
      const simplifiedThumbnails = product.thumbnails.map(thumb => ({
        img: thumb.img || '',
        alt: thumb.alt || ''
      }));
      setThumbnails(simplifiedThumbnails);
    } else {
      setThumbnails([{ img: '', alt: '' }]);
    }
    
    // Set sizes if they exist
    if (product.sizes && product.sizes.length > 0) {
      // Convert sizes to match our simplified structure
      const simplifiedSizes = product.sizes.map(size => ({
        label: size.label || ''
      }));
      setSizes(simplifiedSizes);
    } else {
      setSizes([{ label: '' }]);
    }
    
    setOpen(true);
  };

  const resetForm = (): void => {
    setFormData({
      name: '',
      subtitle: '',
      price: 0,
      mainImage: '',
      tagline: '',
      environmentalInfo: '',
      description: '',
      colorName: '',
      styleCode: '',
      madeIn: '',
      isNew: false,
      isBestSeller: false
    });
    setThumbnails([{ img: '', alt: '' }]);
    setSizes([{ label: '' }]);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Prepare the product data
      const productData: Partial<ProductType> = {
        ...formData,
        // Filter out empty thumbnails
        thumbnails: thumbnails.filter(thumb => thumb.img).map(thumb => ({
          img: thumb.img,
          alt: thumb.alt
        })),
        // Filter out empty sizes
        sizes: sizes.filter(size => size.label).map(size => ({
          label: size.label
        })),
        // Default to 1 color
        colors: 1,
        price: formData.price
      };
  
      // If editing, update product
      if (editingProduct && editingProduct.id) {
        // Send to your API endpoint for update
        const response = await fetch(`http://localhost:1337/editProduct/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        
        // Refetch the products to get updated data
        const productsResponse = await fetch('http://localhost:1337/getSneakers');
        if (productsResponse.ok) {
          const updatedProducts = await productsResponse.json();
          setProductList(updatedProducts);
        }
        
        setSuccessMessage('Product updated successfully!');
        toast.success("Product updated successfully!");
      } 
      // Otherwise create new product
      else {
        // Send to your API endpoint for creation - no ID is sent
        const response = await fetch('http://localhost:1337/insertSneaker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
  
        // Refetch the products to get updated data including relations
        const productsResponse = await fetch('http://localhost:1337/getSneakers');
        if (productsResponse.ok) {
          const updatedProducts = await productsResponse.json();
          setProductList(updatedProducts);
        }
        
        setSuccessMessage('Product created successfully!');
        toast.success("Product created successfully!");
      }
  
      // Reset form and close dialog
      resetForm();
      setOpen(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
  
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Failed to save product!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (productId: string | number): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:1337/deleteProduct/${productId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the product from the list
        setProductList(productList.filter(p => p.id !== productId));
        setSuccessMessage('Product deleted successfully!');
        toast.success("Product deleted successfully!");
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product!");
    }
  };
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button className="mb-4 py-5" variant="outline">+ Create</Button>
        </DialogTrigger>

        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
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
                <div key={index} className="grid grid-cols-2 gap-2 items-end">
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
                    className="col-span-2"
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
                <div key={index} className="grid grid-cols-1 gap-2 items-end">
                  <Input
                    placeholder="Size Label (e.g. US 6)"
                    value={size.label}
                    onChange={(e) => handleSizeChange(index, 'label', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
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
                {isSubmitting ? (editingProduct ? 'Updating...' : 'Creating...') : (editingProduct ? 'Update Product' : 'Create Product')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">NAME</th>
              <th className="p-2">PRICE</th>
              <th className="p-2">COLOR</th>
              <th className="p-2">STATUS</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {productList.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found. Create one to get started.
                </td>
              </tr>
            ) : (
              productList.map((product) => (
                <tr key={product.id?.toString()} className="border-b hover:bg-gray-50">
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">฿ {formatPrice(product.price)}</td>
                  <td className="p-2">{product.colorName}</td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      {product.isNew && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          Best Seller
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 space-x-2">
                    <Button 
                      onClick={() => startEditing(product)} 
                      className="px-3 py-1 border text-sm rounded"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => deleteProduct(product.id as string | number)} 
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}