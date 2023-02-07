import { Header, BodyLayout } from "./index";
const MainLayout = (props) => {

  return (
    <>
      <Header></Header>
      <BodyLayout>{props.children}</BodyLayout>
    </>
  )

}

export default MainLayout;