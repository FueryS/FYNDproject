import "./bodyUtilities.css";
import "./bodymain.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function BodyMain({ id, imagePath }) {
  console.log("Rendering BodyMain with:", { id, imagePath });

  return (
    <Link to={`/product/${id}`}>
      <motion.div
        className="skeliton-image"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden", margin: "5rem 2rem" }}
      >
        <img src={imagePath} alt={`Image id: ${id}`} />
      </motion.div>
    </Link>
  );
}

export default BodyMain;
