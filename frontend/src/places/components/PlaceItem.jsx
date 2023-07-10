import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./PlaceItem.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);
  const confirmDelete = () => {
    // setShowConfirm(false)
    closeConfirm()
    console.log('deleting');
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom ={16}/>
        </div>
      </Modal>

      <Modal
      show={showConfirm}
      onCancel={closeConfirm}
      header='Are you sure?'
      contentClass="place-item__modal-content"
      footerClass="place-item__modal-actions"
      footer={<>
      <Button inverse onClick={closeConfirm}>Cancel</Button>
      <Button danger onClick={confirmDelete}>Delete</Button>
      </>}>
        <p>Do you want to delete this place? Beware it will be permanently deleted</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
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
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger onClick={openConfirm}>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
