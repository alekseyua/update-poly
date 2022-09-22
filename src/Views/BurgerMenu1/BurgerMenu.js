import React, { useEffect, useRef } from "react";
import useDimensions  from "./use-dimensions";
import Navigation  from "./Navigation";
import MenuToggle  from "./MenuToggle";
import { useStoreon } from "storeon/react";

import styles from "./styles.module.scss";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        backgroundColor: 'rgba(0,0,0,.4)',
        // opacity: 0.5,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(23px at 40px 40px)",
        backgroundColor: 'rgb(255, 209, 209)',
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

const BurgerMenu = ({ itemIds, site_configuration }) => {
    const {toggleBurgerMenu}=useStoreon('toggleBurgerMenu');
    const [isOpen, setToggleOpen ] = useState(false)
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    const toggleOpen = () => {
        console.log('toggle burger menu')
        setToggleOpen(c=>!c)
    }


    useEffect(() => {
      const body = document.querySelector('body');
      body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen])

    useEffect(()=>{
        toggleBurgerMenu === 2 || toggleBurgerMenu === 1 ? toggleOpen() : null
    },[toggleBurgerMenu])
    
    //</nav>variants={sidebar}>
    return (
        <nav
        
            className={styles["burger-nav"]}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <div className={styles["burger-background"]} > 
                <Navigation itemIds={itemIds} site_configuration ={site_configuration } isOpen={isOpen}/>
                <MenuToggle toggle={() => toggleOpen()} />
            </div>
        </nav>
    )
}

export default BurgerMenu;
