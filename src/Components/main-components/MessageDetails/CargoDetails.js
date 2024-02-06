
const CargoDetails = ({item,val,indexval}) => {
    const {markandnbr,cargotypecode,description}=item;

    
       const showCargoDetails=()=>{
        if(val==0){
          const data = document.getElementById(`inside-cargo${val}`);
          const computedStyle = window.getComputedStyle(data);
          const displayProperty = computedStyle.getPropertyValue('display');
          
          if(displayProperty=="none"){
            data.style.display="block"
          }
  
          else{
            data.style.display="none"
          }
          
        }

     

        else{
          const data = document.getElementById(`inside-cargo${val}`);
          const computedStyle = window.getComputedStyle(data);
          const displayProperty = computedStyle.getPropertyValue('display');
          
          if(displayProperty=="none"){
            data.style.display="block"
          }
  
          else{
            data.style.display="none"
          }
          
        }
        
      
       } 

    
  
    return (
      <div className="cargo-card">
        <h1 onClick={() => showCargoDetails()}>
        Bolcargos {indexval + 1}{" "}
        </h1>
        {
         (val===0)?<div className="inside-cargo" id={`inside-cargo${val}`}>
          <p>Markandnbr : {markandnbr}</p>
          <p>Cargotypecode : {cargotypecode}</p>
          <p>description : {description}</p>
         
        </div>:
          <div className="inside-cargo" id={`inside-cargo${val}`}>
          <p>Markandnbr : {markandnbr}</p>
          <p>Cargotypecode : {cargotypecode}</p>
          <p>description : {description}</p>
         
        </div>
        }
        
      </div>
    );
}

export default CargoDetails;
