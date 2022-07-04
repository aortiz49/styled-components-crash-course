import React from 'react';
import { StyledCard } from '../StyledCard/Card.styled';

type Card = {
    item: {
        id: number;
        title: string;
        body: string;
        image: string;
    };
};

export const Card = ({ item }: Card) => {
    return (
        <StyledCard layout={item.id % 2 == 0 ? "row-reverse" : "row"}>
            <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
            </div>

            <div>
                <img src={`./images/${item.image}`} alt="" />
            </div>
        </StyledCard>
    );
};
