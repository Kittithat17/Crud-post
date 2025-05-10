import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/global_mercedes_motorsport_ss25_launch_catlp_navigation_category_clothing_d_b73075d472.jpg",
  },
  {
    artist: "sdfsf",
    art: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/global_mercedes_motorsport_ss25_launch_catlp_navigation_category_all_motorsport_d_ac41c7cd6c.jpg",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/global_mercedes_motorsport_ss25_launch_catlp_navigation_category_accessories_d_4b82e8d5c6.jpg",
  },
  {
    artist: "Tfsfd",
    art:"/images/we.avif",

  },
  {
    artist: "sdfsd",
    art: "/images/we2.avif",
  },
  {
    artist: "sdds",
    art: "https://z2photorankmedia-a.akamaihd.net/media/b/i/d/bid95/normal.jpg",
  },
  {
    artist: "sdfds",
    art: "https://photorankmedia-a.akamaihd.net/media/7/j/d/7jd95/normal.jpg",
  },
  {
    artist: "dfdsfg",
    art: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/global_100_thieves_drop_3_originals_ss25_introduce_hp_navigation_card_teaser_d_d8b15052eb.jpg",
  },
]

export function ScrollAreaHorizontalDemo() {
  return (
    <div className="pb-5">

    <ScrollArea className="max-w-11/12 whitespace-nowrap rounded-md border mx-auto">
      <div className="flex w-max space-x-4 py-5">
        {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0 px-3">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4]  object-cover"
                width={300}
                height={400}
                />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
        </div>
  )
}
