import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  current_balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
