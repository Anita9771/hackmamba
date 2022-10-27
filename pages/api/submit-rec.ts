import { NextApiHandler } from "next"
import { getXataClient } from "../../utils/xata.codegen";




 const handler: NextApiHandler = async (req, res) => {
    const xata = await getXataClient();
    const {name, occupation, title, description } = req.body;
    await xata.db.nextjs_with_xata_example.create({
        description,
        title,
        name,
        occupation
      });
      res.end()
    //   console.log(record);
    }

    export default handler