'use client';

import ProductList from "@/components/Home/ProductList";
import { EmptyState, ErrorState, LoadingState } from "@/components/Global/States";
import { usePages } from "@/context/PageContext";
import { useEffect } from "react";
import Banner from "@/components/Home/Banner";

export default function Home() {
  const id = "43"
  const { pageData, isLoading, error, setQueryParams } = usePages();

  useEffect(() => {
    setQueryParams((prev) => ({ ...prev, id: id, _fields: "acf", acf_format: "standard" }));
  }, [setQueryParams]);

  if (isLoading) return <LoadingState height="100vh" />
  if (error) return <ErrorState message="Error fetching page." height="100vh" />
  if (!pageData?.acf) return <EmptyState message="Page Not Found" height="100vh" />

  const { banner_button, banner_heading, banner_image_desktop, banner_image_mobile, banner_text, banner_url } = pageData?.acf

  const bannerProps = {
    heading: banner_heading,
    text: banner_text,
    button: banner_button,
    desktopImage: banner_image_desktop,
    mobileImage: banner_image_mobile,
    url: banner_url,
  };

  const productListProps = {
    tag: "16",
  };

  return (
    <>
      <Banner {...bannerProps} />
      <ProductList {...productListProps} />
    </>
  );
}
