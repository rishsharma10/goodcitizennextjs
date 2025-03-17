import CrumbIcons from "@/components/CrumbIcons";
import { Typography } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
const { Row, Col, Button } = {
    Row: dynamic(() => import("antd").then(module => module.Row), { ssr: false }),
    Col: dynamic(() => import("antd").then(module => module.Col), { ssr: false }),
    Button: dynamic(() => import("antd").then(module => module.Button), { ssr: false }),
}

const ErrorPage = () => {
    return <section className="error-page h-100">
        <div className="container-fluid h-100">
            <Row justify="center" className="h-100">
                <Col className="gutter-row" span={12}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                            <CrumbIcons.ErrorSvg />
                            <div className="text-center mt-4">
                                <Typography.Title level={3} className="m-0 mb-2 fw-bold">Sorry, There&#39;s Nothing Here...</Typography.Title>
                                <Typography.Paragraph className="mb-3">Uh no, we can&#39;t seem to find the page you&#39;re looking for.</Typography.Paragraph>
                                <Link href="/"><Button type="primary" size={'large'}>Back to Login</Button></Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </section>
}

export default ErrorPage