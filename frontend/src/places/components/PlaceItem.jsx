import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function PlaceItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const confirmDelete = async () => {
    // setShowConfirm(false)
    closeConfirm();
    try{
      await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE')
      props.onDelete(props.id)
    }catch(err){}
  };

  return (
    <>
    <ErrorModal error={error} onClear = {clearError}/>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirm}
        onCancel={closeConfirm}
        header="Are you sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeConfirm}>
              Cancel
            </Button>
            <Button danger onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to delete this place? Beware it will be permanently
          deleted
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              view on map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={openConfirm}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
