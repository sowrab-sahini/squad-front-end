// This file contains code to header display.

function Header() {
    const header_style = {
        margin: 0,
        padding: '1%',
        fontStyle: "italic",
        color: "white",
        backgroundSize: "100%",
        backgroundPosition: "center center",
        backgroundImage: `url("https://s1.1zoom.me/big0/954/Chili_pepper_Garlic_Spices_557130_1280x853.jpg")`,

    };
    return ( 
        <div className="jumbotron text-center" style={header_style}>
            <h1>UNT Food Dining APP</h1>
            <h4>Single place to search for food!</h4> 
        </div>
    );
}
    
export default Header;