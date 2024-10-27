"use client";

import { Category } from "@prisma/client";
import React, { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  category: Category;
};

function DeleteCategoryDialog({ trigger, category }: Props) {
  return <div>DeleteCategoryDialog</div>;
}

export default DeleteCategoryDialog;
