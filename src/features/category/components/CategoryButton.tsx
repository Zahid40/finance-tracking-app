import { Button } from '@/components/ui/button'
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import { CategoryForm } from './CategoryForm'

export default function CategoryButton(props: { categoryRefresh: (refresh: boolean) => void }) {
  const {categoryRefresh} = props;
    const [isCreateCategoryDrawerOpen, setIsCreateCategoryDrawerOpen] = useState(false);
  return (
    <>
        <Button
        variant={"secondary"}
        className="mb-8 w-full"
        onClick={() => setIsCreateCategoryDrawerOpen(true)}
      >
        <Plus className="size-4" /> Create Category
      </Button>
      <Drawer open={isCreateCategoryDrawerOpen} onOpenChange={setIsCreateCategoryDrawerOpen}>
        <DrawerContent className="max-w-3xl m-auto">
          <DrawerHeader >
            <DrawerTitle>Create New Category</DrawerTitle>
            <DrawerDescription>
              Fill in the details to create a new category.
            </DrawerDescription>
          </DrawerHeader>
          <CategoryForm isOpen={setIsCreateCategoryDrawerOpen} categoryRefresh={categoryRefresh} />
          <DrawerClose asChild className="absolute right-4 top-4 ">
              <Button
                variant="outline"
                className="rounded-full size-8 border-2 border-primary p-0"
              >
                <Plus className="rotate-45 size-4" />
              </Button>
            </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  )
}
