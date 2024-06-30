"use client";
import {AnimatePresence, motion, useInView, useScroll, useTransform} from "framer-motion";
import React from "react";
import {Attributes, PaddedContainer, Section} from "@/app/components/Container";
import {create} from "zustand";
import {FaFacebook, FaInstagram} from "react-icons/fa6";
import {ImTree} from "react-icons/im";
import {TbChartBubbleFilled} from "react-icons/tb";
import {LuBadgeInfo} from "react-icons/lu";
import {IoCloseOutline} from "react-icons/io5";

export default function Home(): React.JSX.Element {
   React.useEffect(() => {
      (
         async (): Promise<void> => {
            //@ts-ignore
            const locomotiveScroll = (await import("locomotive-scroll")).default;
            const LocomotiveScroll = new locomotiveScroll();
         }
      )()
   }, [])

   return (
      <PaddedContainer $height_t={'300vh'} $padding={`1rem`}>
         <Navbar/>
         <Attributes styles={{marginTop: "2rem"}}>
            <Section styles={{
               height: "100vh",
               display: "flex",
               flexDirection: "column",
               alignItems: "center"
            }}>
               <React.Fragment>
               </React.Fragment>
            </Section>
         </Attributes>

      </PaddedContainer>
   );
}


const Navbar = (): React.JSX.Element => {
   const navbar_ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
   const isNavbarVisible: boolean = useInView(navbar_ref);
   const {set_navbar_visible} = ThisPageState();
   React.useEffect((): void => {
      set_navbar_visible(isNavbarVisible);
   }, [isNavbarVisible, set_navbar_visible])


   const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
   const [inputFocused, setInputFocused] = React.useState<boolean>(false);
   const [secondInputFocused, setSecondInputFocused] = React.useState<boolean>(false);
   const navbar_options: { name: string, link: string }[] = [
      {name: "Home", link: "/"},
      {name: "Dashboard", link: "/dashboard"},
      {name: "LogIn/SignUp", link: "/register"},
      {name: "About Us", link: "/about"}
   ];
   return (
      <React.Fragment>

         <motion.div
            animate={{y: menuOpen ? `-1.4vh` : `100vh`}}
            initial={false}
            transition={{
               duration: 1,
               delay: menuOpen ? 0.5 : 0,
               ease: [0.85, 0, 0.15, 1]
            }}
            className={`fixed w-screen h-screen z-[10] p-[2rem] bg-black left-0 ${menuOpen ? `pointer-events-auto` : `pointer-events-none`}`}>
            <nav className={`flex text-[1.5rem] justify-between items-center`}>
               <motion.h1
                  className={`font-semibold flex gap-[1rem] text-[2rem] items-start`}>
                  <ImTree size={35} className={`rotate-45`}/>
                  FamTree
               </motion.h1>
               <div className={`flex gap-[1rem]`}>
                  <h1
                     onClick={() => window.location.assign("/contact")}
                     className={`border-white border-[0.5px] px-5 rounded-full p-3 hover:text-black hover:bg-white cursor-pointer`}>Let's
                     Talk</h1>
                  <h1
                     onClick={() => setMenuOpen(false)}
                     className={`border-white flex justify-center items-center border-[0.5px] rounded-full p-3 px-4 hover:bg-white hover:text-black cursor-pointer`}>
                     <IoCloseOutline size={30}/>
                  </h1>
               </div>
            </nav>

            <div className={`flex mt-10 gap-[3rem] h-full`}>
               <div className={`flex-1`}>
                  <ul>
                     {navbar_options.map((item: { name: string, link: string }, index: number) => {
                        return <CustomLink key={index} item={item} index={index}/>
                     })}
                  </ul>
               </div>
               <div className={`flex-1 p-5 w-full bg-white/10 rounded-[1rem]`}>
                  <h1 className={`text-[3rem] mb-[1rem]`}>Quick Question?</h1>
                  <motion.form
                     animate={{
                        marginTop: inputFocused ? "4rem" : "0rem"
                     }}
                     className={`h-full relative `}>
                     <motion.h1
                        animate={{opacity: inputFocused ? 1 : 0}}
                        exit={{opacity: 0}}
                        className={`text-[1.5rem] absolute text-white/40 -top-[3.5rem]`}>Your good name.
                     </motion.h1>
                     <input
                        onChange={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder={"Enter name here."}
                        className={`w-full bg-white/10 placeholder-gray-500 mb-[1.5rem] outline-none rounded-full text-[1.5rem] p-4  px-6`}/>
                     <motion.h1
                        animate={{opacity: secondInputFocused ? 1 : 0}}
                        exit={{opacity: 0}}
                        className={`text-[1.5rem] absolute text-white/40 top-[6rem]`}>Your email id.
                     </motion.h1>
                     <motion.input
                        animate={{
                           marginTop: secondInputFocused ? "4rem" : "0rem"
                        }}
                        onChange={() => setSecondInputFocused(true)}
                        onBlur={() => setSecondInputFocused(false)}
                        placeholder={"Enter email here."}
                        className={`w-full bg-white/10 rounded-full outline-none text-[1.5rem] p-4 placeholder-gray-500 px-6`}/>
                     <textarea
                        className={`w-full placeholder-gray-500 outline-none h-[40%] bg-white/10 resize-none  rounded-[3rem] mt-[1.5rem] p-8 text-[1.5rem]`}
                        placeholder={`Enter text.`}>

                     </textarea>
                     <button
                        className={`bg-white w-full p-6 rounded-full mt-[1.5rem] text-black font-semibold`}>Submit
                     </button>
                  </motion.form>
               </div>
            </div>
         </motion.div>


         {/*some thine here*/
         }
         <motion.div
            animate={{
               y: menuOpen ? "-300px" : "0",
            }}
            transition={{
               duration: 1,
               ease: [0.85, 0, 0.15, 1]
            }}
            className={`flex gap-[1rem] items-center w-full`}
            ref={navbar_ref}>
            <motion.h1
               animate={{
                  scale: 1
               }}
               initial={{
                  scale: 0
               }}
               transition={{
                  scale: {
                     delay: 0.05,
                     type: "spring",
                     damping: 15,
                  }
               }}
               className={`flex-[3] pl-10 justify-between flex  relative items-start bg-[#272727] overflow-hidden text-[1.5rem] p-6 rounded-full font-semibold`}>
               <ImTree size={60} className={`absolute opacity-20 rotate-45 top-1`}/>
               <span className={`ml-[4rem]`}>FamTree</span>
               <span className={`opacity-20 flex gap-[0.25rem] items-center font-normal mr-10`}>
                  NewVision
                  <LuBadgeInfo size={30}/>
               </span>
            </motion.h1>
            <motion.div
               whileHover={{
                  y: "10px"
               }}
               animate={{
                  scale: 1
               }}
               initial={{
                  scale: 0
               }}
               transition={{
                  scale: {
                     delay: 0.1,
                     type: "spring",
                     damping: 15,
                  },
                  ease: [0.85, 0, 0.15, 1]
               }}
               className={`flex-[0.5] cursor-pointer bg-white text-black rounded-full flex justify-center items-center p-6`}>
               <FaFacebook size={40}/>
            </motion.div>
            <motion.div
               whileHover={{
                  y: "10px"
               }}
               animate={{
                  scale: 1
               }}
               initial={{
                  scale: 0
               }}
               transition={{
                  scale: {
                     delay: 0.15,
                     type: "spring",
                     damping: 15,
                  },
                  ease: [0.85, 0, 0.15, 1]
               }}
               className={`flex-[0.5] bg-white cursor-pointer  text-black rounded-full flex justify-center items-center p-6`}>
               <FaInstagram size={40}/>
            </motion.div>
            <motion.div
               whileHover={{
                  y: "10px"
               }}
               animate={{
                  scale: 1
               }}
               initial={{
                  scale: 0
               }}
               transition={{
                  scale: {
                     delay: 0.2,
                     type: "spring",
                     damping: 15,
                  },
                  ease: [0.85, 0, 0.15, 1]
               }}
               onClick={() => setMenuOpen(true)}
               className={`flex-[1] cursor-pointer  bg-white p-6 flex justify-between items-center rounded-full text-[1.5rem] text-black font-semibold`}>
               Menu
               <TbChartBubbleFilled size={35}/>
            </motion.div>
            <motion.div
               animate={{
                  scale: 1
               }}
               initial={{
                  scale: 0
               }}
               transition={{
                  scale: {
                     delay: 0.25,
                     type: "spring",
                     damping: 15,
                  },
                  ease: [0.85, 0, 0.15, 1]
               }}
               className={`flex-[0.5] cursor-pointer bg-[#272727] p-6 rounded-full flex justify-center items-center text-[1.5rem]`}>
               LogIn
            </motion.div>

         </motion.div>
      </React.Fragment>
   )
}


const CustomLink = ({item, index}: { item: { name: string, link: string }, index: number }): React.JSX.Element => {
   const [isHovered, setHovered] = React.useState<boolean>(false);
   return (
      <motion.li
         onClick={() => window.location.assign(item.link)}
         onMouseOver={() => setHovered(true)}
         onMouseOut={() => setHovered(false)}
         whileHover={{
            backgroundColor: "rgba(255,255,255,0.15)",
            cursor: "pointer",
         }}
         className={`text-[3rem]  px-3 border-b-gray-300 border-b-[0.5px] relative py-3`} key={index}>
         {item.name}
      </motion.li>
   )
}

type ThisPageStateType = {
   navbar_visible: boolean;
   set_navbar_visible: (visible: boolean) => void;
}

const ThisPageState = create<ThisPageStateType>((set) => ({
   navbar_visible: false,
   set_navbar_visible: (visible: boolean) => set({navbar_visible: visible})
}))