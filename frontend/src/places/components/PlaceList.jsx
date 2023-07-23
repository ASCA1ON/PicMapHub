import React, { useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useParams } from "react-router-dom";
import PlaceItem from './PlaceItem';

import "./PlaceList.css"
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';

function PlaceList(props) {
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    if( props.items.length ===0){
        return (
            <div className="place-list center">
                <Card>
                    { auth.userId === userId ? 
                    ( <><h2>You haven't shared any places, <br/> Maybe share one</h2>
                    <Button to="/places/new">Share Place</Button></>):<h2>No places found for the User</h2>}
                </Card>
            </div>
        )
    }
    return(
        <ul className="place-list">
            {props.items.map(place =>(
                <PlaceItem 
                key={place.id}
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creator}
                coordinates={place.location}
                onDelete={props.onDeletePlace}
                />
            ))}
        </ul>
    )
    
}

export default  PlaceList;