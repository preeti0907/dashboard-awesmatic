

import React from 'react'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ListFilter } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { getProducts } from '../api/products';


async function page({ searchParams }: { searchParams: { page?: string, q?: string } }) {

    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    const searchQuery = searchParams?.q ? searchParams.q : '';
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    

    const products = await getProducts(page, searchQuery, pageSize, start, end);
    
    // console.log(products);
    const totalPages = Math.ceil((products?.count ?? 0) / pageSize);
 
    return (
        <>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                

                <form action="" method="GET" className="mb-4">
                    <input type="text" name="q" defaultValue={searchQuery} placeholder="Search products..." className="p-2 border border-gray-300" />
                    <button type="submit" className="ml-2 p-2 bg-blue-500 text-white"> Search </button>
                </form>

                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Active
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Id</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                MRP
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Sale Price
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Brand
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products?.products?.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    {product.apin}
                                                </TableCell>
                                                <TableCell className="font-medium inline-block w-[1000px]">
                                                    <p className=' line-clamp-1'>{product.product_name}</p>
                                                </TableCell>
                                                <TableCell>
                                                    {product.mrp}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.selling_price}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.brand?.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </CardContent>
                            <CardFooter>

                                <Pagination>
                                    <PaginationContent>
                                        {page > 1 ? 
                                        <PaginationItem>
                                            <PaginationPrevious href={`?page=` + (page - 1) + `&q=${searchQuery}`}/>
                                        </PaginationItem>
                                        : undefined}
                                        
                                        <div className="text-xs text-muted-foreground">
                                            Page <strong>{page}</strong> of <strong>{totalPages} </strong>{" "}products
                                        </div>
                                        {page < totalPages ? 
                                        <PaginationItem>
                                            <PaginationNext href={`?page=` + (page + 1) + `&q=${searchQuery}`} />
                                        </PaginationItem>
                                        : undefined} 
                                    </PaginationContent>
                                </Pagination>

                              
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </>
    )
}

export default page
