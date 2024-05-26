import { URMCard } from "./urmCard";

export const URMCardList = (cards: {contents: {[noteTitle: string]: UrmCardValue}[]}) => {
    return (
        <div>
            <ul>
                {cards.contents.map((card, index) => (
                    <li key={index}>
                        <URMCard 
                            contents={{
                                noteTitle: card[Object.keys(card)[0]].noteTitle,
                                status: card[Object.keys(card)[0]].status,
                                desc: card[Object.keys(card)[0]].desc
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
