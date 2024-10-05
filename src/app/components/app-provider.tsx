"use client";

import { FC, PropsWithChildren, useState } from "react";

import { isServerSide } from "@/lib/utils";
import clientSession from "@/services/clientSession";
import Header from "./header";

const AppProvider: FC<
  PropsWithChildren & {
    initialToken?: string;
  }
> = ({ children, initialToken }) => {
  useState(() => {
    if (!initialToken || isServerSide()) {
      return;
    }
    clientSession.token = initialToken;
  });

  return children;
};

export default AppProvider;
