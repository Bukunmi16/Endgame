import clsx from "clsx"

export default function Languages({language, isLanguageLost, backgroundColor, color}) { 

    

    const styles = {
        backgroundColor: backgroundColor, 
        color: color}
    
    const className = clsx("languagesBtn",{
        lost: isLanguageLost 
    })

    return(     
    <button style={styles} className={className}>
    
                {language}
            </button>
            )
}
