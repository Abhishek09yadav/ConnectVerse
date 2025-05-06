"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

const Page = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* <Button
        label="Toggle Sidebar"
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        className="p-button-sm"
      />

      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2>Sidebar Content</h2>
        <p>This is the content inside the sidebar.</p>
      </Sidebar> */}
    </>
  );
};

export default Page;
