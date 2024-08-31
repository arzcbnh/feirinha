import express from "express";
import httpStatus from "http-status";

const items = [];
let currId = 1;

const app = express();

app.use(express.json());

function hasNeededProperties(item) {
    const hasName = typeof item.name === "string" && item.name !== "";
    const hasQuantity = typeof item.quantity === "number" && item.quantity >= 0;
    const hasType = typeof item.type === "string" && item.type !== "";

    return hasName && hasQuantity && hasType;
}

function hasExtraProperties(item) {
    const properties = Object.entries(item);
    return properties.find(([key]) => key !== "name" && key !== "quantity" && key !== "type");
}

function hasExistingName(item) {
    return items.some(entry => entry.name === item.name);
}

app.post("/items", (req, res) => {
    const item = { ...req.body };

    if (!hasNeededProperties(item) || hasExtraProperties(item)) {
        res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
        return;
    }

    if (hasExistingName(item)) {
        res.sendStatus(httpStatus.CONFLICT);
        return;
    }

    items.push({ id: currId++, ...item });
    res.sendStatus(httpStatus.CREATED);
});
