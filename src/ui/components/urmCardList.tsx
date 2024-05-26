import { URMCard } from "./urmCard";

export const URMCardList = (cards: {contents: {[noteTitle: string]: UrmCardValue}[]}) => {
    return (
        <div>
            {cards.contents.map((card, index) => (
                <div key={index}>
                    <URMCard 
                        contents={{
                            noteTitle: card[Object.keys(card)[0]].noteTitle,
                            status: card[Object.keys(card)[0]].status,
                            desc: card[Object.keys(card)[0]].desc
                        }}
                    />
                </div>
            ))}
        </div>
    );
};
