import type { InferGetServerSidePropsType } from "next";
import { getXataClient } from "../utils/xata.codegen";
// import xatafly from '../public/xatafly.gif'
import Head from "next/head";
import homePageStyles from "../styles/homepage.module.css";
import { TestForm } from "../components/TestForm";

export default function IndexPage({
  links,
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log('images', images)

  const send = async () => {
  }

  // 


  return (
    <div className={homePageStyles.homepage}>
      <Head>
        <title>Mode-el</title>
        <meta
          name="keywords"
          content="xata, cloudinary, next js, hackmamba, jamstack"
        />
        <link rel="icon" href="camera-icon.png" />
      </Head>

      <h2>MODE-EL</h2>

      <h1>
        think <span>you've seen</span> magic
      </h1>

      
      {images.map((image) => {
        return (
          <div className="images" key={image.id} style={{display: 'flex'}} >
          <img src={image.image} alt={image.title} width="50px" height="50px" />
          </div>
        );
      })}

      {links.map((link) => {
        return (
          <section key={link.id}>
          <p>{link.title}</p>
          <p>{link.description}</p>
          <p>{link.url}</p>
          </section>
        );
      })}


      <TestForm />
    </div>
  );
}

export const getServerSideProps = async () => {
  const xata = await getXataClient();
  const links = await xata.db.clients.getAll();
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((res) => res.json());

  const { resources } = results;

  const images = resources.map((resource) => {
    const { width, height } = resource;
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    };
  });
  return {
    props: {
      links,
      images,
    },
  }; 
};
