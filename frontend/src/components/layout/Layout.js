import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
  const siteTitle = title
    ? `${title} | RS Softtecs - IT Training & Placement`
    : "RS Softtecs - Pune's #1 IT Training & Placement Institute";
  
  const siteDescription = description || 
    "RS Softtecs Pvt Ltd - Leading IT Training Institute in Pune since 2011. Expert training in Java, Python, MERN, Data Science, AWS & more. 100% Placement Assistance.";

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="IT training Pune, Java course, Python training, MERN stack, Data Science, AWS training, placement assistance, RS Softtecs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
