"use client";

import { Button } from "@carbon/react";
import { ArrowLeft } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      kind="secondary"
      onClick={() => router.back()}
      renderIcon={ArrowLeft}
    >
      Back
    </Button>
  );
};
