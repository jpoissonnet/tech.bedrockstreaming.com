import Footer from "./footer";
import Navbar from "./navbar";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Navbar />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
