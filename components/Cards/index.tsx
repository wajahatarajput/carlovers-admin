import React from "react";

interface CardsProps {
    count: number;
    type: string;
    icon: string;
}

export const Cards: React.FC<CardsProps> = ({ count, type, icon }) => {
    return (
        <div className="card shadow border-left-success py-2 m-4 text-center">
            <div className="col-auto">
                <i className={icon}></i>
            </div>
            <hr />
            <div className="card-body">
                <div className="row align-items-center no-gutters">
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-outline-secondary border border-0 position-relative"
                            disabled
                        >
                            {type}{" "}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                {count}{" "}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
