import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateTheme } from '../../Store/themeSlice';

function Header() {

    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme); // Accessing the theme state from Redux store

    const handleColorChange = (color) => {
        dispatch(updateTheme(color)); // Dispatching the updateTheme action with the new color
    };
    
    return (
        <>
        <h2 style={{ color: theme }}>Header</h2>
        <button onClick={() => handleColorChange('red')}>Red</button>
            <button onClick={() => handleColorChange('green')}>Green</button>
            <button onClick={() => handleColorChange('blue')}>Blue</button>
        </>
    )
}

export default Header