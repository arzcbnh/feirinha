import express from "express";
import httpStatus from "http-status";

const items = [];
let currId = 1;

const app = express();

app.use(express.json());
