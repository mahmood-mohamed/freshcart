import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SubCategories from "../../components/SubCategories/SubCategories";
import AllCategories from "../../components/AllCategories/AllCategories";
import MainSlider from "../../components/MainSlider/MainSlider";
import useFetch from "../../hooks/useFetch";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";


export default function Categories() {

  const { data, error, isLoading } = useFetch("categories"); // Custom hook to fetch all categories
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  function fetchSubCategories(categoryId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  }

  const { data: subCategory, error: subCategoryError, isLoading: subCategoryLoading } = useQuery({
    queryKey: ["subCategories", selectedCategory],
    queryFn: () => fetchSubCategories(selectedCategory),
    select: (res) => res.data.data,
    enabled: !!selectedCategory,
    gcTime: 60000, // Remove stale data after 1 minute from the cache
    staleTime: 5000,  // Refresh data every 5 seconds
  });

  const handleExploreClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onOpen();
  }

  return (
    <div className="pm-5">
      <MainSlider data={data}/>
      <h2 className="text-2xl font-bold text-center my-6">Product Categories</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AllCategories data={data} isLoading={isLoading} error={error} setSelectedCategory={handleExploreClick} />
      </div>

        <Modal isOpen={isOpen} onOpenChange={onClose} scrollBehavior="inside" placement="center" backdrop="blur">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">SubCategories</ModalHeader>
            <ModalBody>
              <SubCategories subCategory={subCategory} subCategoryError={subCategoryError} subCategoryLoading={subCategoryLoading} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


    </div>
  );
}
