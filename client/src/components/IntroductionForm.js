import React, { useEffect, useState } from "react";
import clsx from "clsx";

export const getRoomFromURLObject = (urlObject) => {
    const roomMatch = urlObject.pathname?.match(/\/room\/([\w\-\.~!$&'\(\)*+,;=:@]+)\/?/); // ^\/room\/([^\/?&#]+)\/?
    if (roomMatch && roomMatch.length > 1) {
        return roomMatch[1];
    }
    return null;
};

export const IntroductionForm = ({ onJoin, roomFromURL }) => {
    const [myName, setMyName] = useState("");
    const [isSpectating, setIsSpectating] = useState(false);

    useEffect(() => {
        setMyName(window.localStorage.getItem("myName") || "");
        setIsSpectating(JSON.parse(window.localStorage.getItem("isSpectating")) || false);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const { room: roomFromForm } = Object.fromEntries(new FormData(e.target));
        const roomName = roomFromURL || roomFromForm;
        onJoin(myName, { room: roomName, isSpectating });
        window.localStorage.setItem("myName", myName);
        window.localStorage.setItem("isSpectating", JSON.stringify(isSpectating));
        window.gtag("event", "select_content", {
            content_type: "room",
            item_id: roomName,
        });
    };

    return (
        <div className={clsx("container", "py-3")}>
            <div className={clsx("introduction-form", "row", "justify-content-center")}>
                <div className={clsx("col", "col-sm-6", "col-lg-4")}>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="room-input" className="form-label">
                            Room
                        </label>
                        <input
                            id="room-input"
                            type="text"
                            name="room"
                            defaultValue={roomFromURL || ""}
                            className="form-control"
                            maxLength={12}
                            disabled={!!roomFromURL}
                        />

                        <label htmlFor="name-input" className="form-label">
                            Your Name
                        </label>
                        <input
                            id="name-input"
                            type="text"
                            name="name"
                            value={myName}
                            onChange={(e) => setMyName(e.target.value)}
                            className="form-control"
                            maxLength={8}
                            required
                        />

                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                name="isSpectating"
                                className="form-check-input me-2"
                                checked={isSpectating}
                                onChange={(e) => setIsSpectating(e.target.checked)}
                            />
                            Spectate
                        </label>

                        <button type="submit" className="mt-3 w-100 btn btn-primary">
                            Join
                        </button>

                        <p className="mt-2 small">
                            By clicking Join, you agree to our{" "}
                            <a href="/cookie-policy">Cookie Policy</a> and{" "}
                            <a href="/terms-of-service">Terms of Service</a>.
                        </p>

                        <p className="small">
                            Feedback or suggestions?
                            <br />
                            Email us at feedback&nbsp;
                            <i className="fa-solid fa-at small" />
                            &nbsp;planningpoker.page
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
