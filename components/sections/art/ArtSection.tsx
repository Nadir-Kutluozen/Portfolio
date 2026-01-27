// "use client";

// import styles from "./ArtSection.module.css";
// import { motion } from "framer-motion";
// import { Instagram, ArrowRight } from "lucide-react";

// // Mock Data for "Pinterest" Grid
// // In a real app, these would come from a CMS or explicit file list
// const artItems = [
//     { id: 1, src: "/superman.JPG", type: "img" },
//     { id: 2, src: "/spiderman1.PNG", type: "img" },
//     { id: 3, src: "/spacewomans.PNG", type: "img" },
//     { id: 4, src: "/wiredraccoon.PNG", type: "img" },
//     { id: 5, src: "/spaceman.PNG", type: "img" },
//     { id: 6, src: "/raccoonschilling.PNG", type: "img" },
//     { id: 7, src: "/eren.PNG", type: "img" },
//     { id: 8, src: "/womaninspace.PNG", type: "img" },
// ];

// export default function ArtSection() {
//     return (
//         <section className={styles.artSection}>

//             <motion.h2
//                 className={styles.heading}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//             >
//                 ART CORNER
//             </motion.h2>

//             <div className={styles.gridContainer}>
//                 <div className={styles.masonryGrid}>
//                     {artItems.map((item, index) => (
//                         <motion.div
//                             key={item.id}
//                             className={styles.artItem}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: index * 0.05 }}
//                         >
//                             {/* Placeholder for actual image */}
//                             {item.src && (
//                                 <img
//                                     src={item.src}
//                                     alt="Digital Art"
//                                     className={styles.artImage}
//                                     style={{ width: '100%', height: 'auto', display: 'block' }}
//                                 />
//                             )}

//                             <div className={styles.overlay}>
//                                 <Instagram size={32} className={styles.artIcon} />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Fade Overlay with Button */}
//                 <div className={styles.fadeOverlay}>
//                     <div className={styles.footer}>
//                         <motion.button
//                             className="btn btn-outline-light rounded-4 px-4 py-2 fs-6 d-inline-flex align-items-center gap-2"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             style={{ backdropFilter: 'blur(5px)', background: 'rgba(0,0,0,0.5)' }}
//                         >
//                             See More <ArrowRight size={20} />
//                         </motion.button>
//                     </div>
//                 </div>
//             </div>

//         </section>
//     );
// }
