import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/js/bootstrap'
function Button() {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="success">
            Choose account
          </Dropdown.Toggle>
  
          <Dropdown.Menu variant="dark">
            <Dropdown.Item href="#/action-2">Musician</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Organizer</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  
        
      </>
    );
  }
  
  export default Button;