import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

export const HostControls = ({
    agendaQueue,
    isShowingVotes,
    onResetVotes,
    onToggleShowingVotes,
    onSetAgendaQueue,
}) => {
    const [isShowingAgendaQueue, setIsShowingAgendaQueue] = useState(false);
    const textareaRef = useRef();
    const agendaQueueLen = agendaQueue.length;

    useEffect(() => {
        if (isShowingAgendaQueue) {
            textareaRef.current.value = agendaQueue.join("\n");
        }
    }, [agendaQueueLen]);

    const toggleIsShowingAgendaQueue = () => {
        setIsShowingAgendaQueue((prev) => !prev);
    };

    const onTextareaChange = (e) => {
        const nextText = e.target.value;
        const nextQueue = nextText ? nextText.split("\n") : [];
        onSetAgendaQueue(nextQueue);
    };

    return (
        <div className="host-controls-wrapper">
            <div className="host-controls container-fluid">
                <div className="btn-toolbar py-2" role="toolbar">
                    <div className="btn-group me-2 my-1" role="group">
                        <button
                            type="button"
                            onClick={onToggleShowingVotes}
                            className={clsx(
                                "btn",
                                isShowingVotes ? "btn-outline-primary" : "btn-primary"
                            )}
                        >
                            &#128065;
                        </button>
                    </div>

                    <div className="btn-group me-2 my-1" role="group">
                        <button
                            type="button"
                            onClick={onResetVotes}
                            disabled={!isShowingVotes}
                            className={clsx(
                                "btn",
                                isShowingVotes ? "btn-primary" : "btn-outline-primary"
                            )}
                        >
                            {agendaQueueLen > 1 ? "Next Agenda Item" : "Reset All Votes"}
                        </button>
                    </div>

                    <div className="flex-grow-1">&nbsp;</div>

                    <div className="btn-group me-2 my-1" role="group">
                        <button
                            type="button"
                            onClick={toggleIsShowingAgendaQueue}
                            className={clsx(
                                "btn",
                                isShowingAgendaQueue ? "btn-primary" : "btn-outline-primary"
                            )}
                        >
                            &#128220;
                        </button>
                    </div>
                </div>

                {isShowingAgendaQueue && (
                    <div className="pb-3">
                        <textarea
                            className={clsx("form-control", "agenda-textarea")}
                            rows={8}
                            placeholder="Copy and paste (or type) agenda here. Each line is a separate item."
                            defaultValue={agendaQueue.join("\n")}
                            onChange={onTextareaChange}
                            spellCheck={false}
                            ref={textareaRef}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
