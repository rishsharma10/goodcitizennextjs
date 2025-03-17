import MainLayout from "@/components/common/MainLayout";
import { AntForm, Col, Row, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import { Button, Flex, Form } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlobalContext } from "@/context/Provider";
const ContentPage = () => {
  const [form] = Form.useForm();
  const {Toast} =useContext(GlobalContext)
  const [state, setState] = useState<any>('');
 
  return (
    <React.Fragment>
      <section className="import_export">
       content
      </section>
    </React.Fragment>
  )
}
ContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default ContentPage;