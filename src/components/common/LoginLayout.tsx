
import {
  Col,
  Row,
} from "@/lib/AntRegistry";


const LoginLayout = ({ children }: any) => {
  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
              {children}
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default LoginLayout;
