import mongoose from "mongoose";

const PalavrasSchema = new mongoose.Schema({
    texto: { type: String, required: true, unique: true },
    criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model('Palavra', PalavrasSchema);