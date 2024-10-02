import React , {useState} from 'react';
import Sidebar from '../components/Sidebar';  // Asegúrate de que esta ruta sea correcta
import ProfileCard from '../components/ProfileCard';

    

const Search = () => {
    const [CantEnc, setNumber] = useState(0);
    
    const updateNumber = (newValue) => 
    {
      setNumber(Number(newValue));
    };
  
    const renderComponents = () => 
    {
      let components = [];
      for (let i = 0; i < CantEnc; i++) 
        {
        components.push(<ProfileCard key={i} />); 
        }
        return components;
    };
    
    return (
        <div>
            <Sidebar />  {/* Mostrar solo la sidebar */}
            <div className= "profile-content">
              <p>Cantidad de perfiles encontrados: {CantEnc}</p>
              <p>Ingrese cantidad de perfiles encontrados </p>
              <input type="number" onChange={ e => updateNumber(e.target.value) } placeholder="Actualizar cantidad de perfiles encontrados" />   
              <div>
                {renderComponents()} 
                </div>
            </div>
        </div>
    );
};

export default Search;