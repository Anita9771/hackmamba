import type { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { getXataClient, XataClient } from "../utils/xata.codegen";
// import xatafly from '../public/xatafly.gif'
import Head from "next/head";
import homePageStyles from "../styles/homepage.module.css";

export default function IndexPage({
  links,
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log('images', images)

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
          <img src={image.image} alt={image.title} width="50px" height="50px" />
        );
      })}

    {/* {images.map((image) => {
        return (
          <img src={image.image} alt={image.title} width="50px" height="50px" />
        );
      })} */}
        
        {/* <img src={images[0]} alt='alt' width="50px" height="50px" /> */}
        

      {links.map((link) => {
        return (
          <section key={link.id}>
          <p>{link.title}</p>
          <p>{link.description}</p>
          <p>{link.url}</p>
          </section>
          // <img src={link.link} alt={link.title} width="50px" height="50px" />
        );
      })}
    </div>
  );
}

// const xata = new XataClient()

export const getServerSideProps = async () => {
  const xata = await getXataClient();
  const links = await xata.db.nextjs_with_xata_example.getAll();
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
  // console.log('results is', results)

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

// export const getStaticProps = async () => {
//   const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`, {
//     headers: {
//       Authorization:`Basic ${Buffer.from (process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`,
//       // 'content': 'json'
//     }
//   }).then(res => res.json());
//   console.log('results is', results)
//   return {
//     props:{

//     }
//   }
// }

// const pushDummyData = async () => {
//   const response = await fetch('/api/write-links-to-xata')

//   if (response.ok) {
//     window?.location.reload()
//   }
// }

// const removeDummyItem = async (id: string) => {
//   const { status } = await fetch('/api/clean-xata', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ id }),
//   })

//   if (status === 200) {
//     window?.location.reload()
//   }
// }

// <main>
//   <header>
//     {/* <Image src={xatafly} alt='xata icon' priority /> */}
//     {/* <h1>
//       Next.js with<span aria-hidden>&#8209;</span>xata
//     </h1> */}
//   </header>
//   <article>
//     {links.length ? (
//       <ul>
//         {links.map(({ id, title, url, description }) => (
//           <li key={url}>
//             <a href={url} rel="noopener noreferrer" target="_blank">
//               {title}
//             </a>
//             <p>{description}</p>

//             <button
//               type="button"
//               onClick={() => {
//                 removeDummyItem(id)
//               }}
//             >
//               <span role="img" aria-label="delete item">
//                 🗑
//               </span>
//             </button>
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <section>
//         <h2>No records found.</h2>
//         <strong>
//           Create a `nextjs_with_xata_example` and push some useful links to
//           see them here.
//         </strong>
//         <button
//           type="button"
//           onClick={() => {
//             pushDummyData()
//           }}
//         >
//           Push records to Xata
//         </button>
//       </section>
//     )}
//   </article>
//   <footer>
//     <span>
//       Made by{' '}
//       <a href="https://xata.io" rel="noopener noreferrer" target="_blank">
//         <object data="/xatafly.svg" />
//       </a>
//     </span>
//   </footer>
// </main>
