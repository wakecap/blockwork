import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  RatingStars,
  ProductRating,
  ReviewRating,
  CompactRating,
  TenStarRating,
  useRating,
} from "../components/RatingStars";

const meta: Meta<typeof RatingStars> = {
  title: "Forms and Data Entry/RatingStars",
  component: RatingStars,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A star rating component for displaying and selecting ratings with customizable appearance and behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxStars: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined"],
    },
    color: {
      control: { type: "color" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    showValue: {
      control: { type: "boolean" },
    },
    showLabel: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);

    return <RatingStars value={rating} onChange={setRating} className="w-full max-w-md" />;
  },
};

export const ProductRatingExample: Story = {
  render: () => {
    const [rating, setRating] = React.useState(4.5);

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Product Rating</h2>
        <ProductRating value={rating} onChange={setRating} readOnly={false} />
      </div>
    );
  },
};

export const ReviewRatingExample: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Review Rating</h2>
        <ReviewRating value={rating} onChange={setRating} />
      </div>
    );
  },
};

export const CompactRatingExample: Story = {
  render: () => {
    const [rating, setRating] = React.useState(3);

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Compact Rating</h2>
        <CompactRating value={rating} onChange={setRating} />
      </div>
    );
  },
};

export const TenStarRatingExample: Story = {
  render: () => {
    const [rating, setRating] = React.useState(7);

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Ten Star Rating</h2>
        <TenStarRating value={rating} onChange={setRating} />
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [rating, setRating] = React.useState(3);

    return (
      <RatingStars value={rating} onChange={setRating} size="sm" className="w-full max-w-md" />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [rating, setRating] = React.useState(4);

    return (
      <RatingStars value={rating} onChange={setRating} size="lg" className="w-full max-w-md" />
    );
  },
};

export const Filled: Story = {
  render: () => {
    const [rating, setRating] = React.useState(3.5);

    return (
      <RatingStars
        value={rating}
        onChange={setRating}
        variant="filled"
        className="w-full max-w-md"
      />
    );
  },
};

export const Outlined: Story = {
  render: () => {
    const [rating, setRating] = React.useState(2);

    return (
      <RatingStars
        value={rating}
        onChange={setRating}
        variant="outlined"
        className="w-full max-w-md"
      />
    );
  },
};

export const CustomColor: Story = {
  render: () => {
    const [rating, setRating] = React.useState(4);

    return (
      <RatingStars
        value={rating}
        onChange={setRating}
        color="#10b981"
        className="w-full max-w-md"
      />
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <RatingStars
        value={4.2}
        onChange={() => {}}
        readOnly={true}
        showValue={true}
        showLabel={true}
        className="w-full max-w-md"
      />
    );
  },
};

export const WithValueAndLabel: Story = {
  render: () => {
    const [rating, setRating] = React.useState(3.5);

    return (
      <RatingStars
        value={rating}
        onChange={setRating}
        showValue={true}
        showLabel={true}
        className="w-full max-w-md"
      />
    );
  },
};

export const ProductCard: Story = {
  render: () => {
    const [rating, setRating] = React.useState(4.3);

    return (
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Product Card</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="w-full h-48 bg-neutral-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-neutral-500">Product Image</span>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Wireless Headphones</h3>
          <p className="text-sm text-neutral-600 mb-3">
            High-quality wireless headphones with noise cancellation
          </p>
          <div className="flex items-center justify-between mb-4">
            <ProductRating value={rating} onChange={setRating} readOnly={true} showValue={true} />
            <span className="text-lg font-bold text-neutral-900">$199.99</span>
          </div>
          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    );
  },
};

export const ReviewForm: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState("");

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Review Form</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Write a Review</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Your Rating</label>
            <ReviewRating value={rating} onChange={setRating} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Your Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors">
              Cancel
            </button>
            <button
              disabled={rating === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                rating > 0
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const RatingComparison: Story = {
  render: () => {
    const { value: rating1, onChange: setRating1 } = useRating(4);
    const { value: rating2, onChange: setRating2 } = useRating(3);
    const { value: rating3, onChange: setRating3 } = useRating(5);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Rating Comparison</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="font-medium text-neutral-900">Product Quality</h3>
              <p className="text-sm text-neutral-600">How would you rate the overall quality?</p>
            </div>
            <RatingStars value={rating1} onChange={setRating1} size="lg" showValue={true} />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="font-medium text-neutral-900">Value for Money</h3>
              <p className="text-sm text-neutral-600">Is it worth the price?</p>
            </div>
            <RatingStars value={rating2} onChange={setRating2} size="lg" showValue={true} />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="font-medium text-neutral-900">Customer Service</h3>
              <p className="text-sm text-neutral-600">How was your experience with support?</p>
            </div>
            <RatingStars value={rating3} onChange={setRating3} size="lg" showValue={true} />
          </div>
        </div>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="font-medium text-neutral-900 mb-2">Average Rating</h3>
          <div className="flex items-center space-x-3">
            <RatingStars
              value={(rating1 + rating2 + rating3) / 3}
              onChange={() => {}}
              readOnly={true}
              showValue={true}
              showLabel={true}
            />
            <span className="text-sm text-neutral-600">Based on 3 criteria</span>
          </div>
        </div>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Interactive Demo</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Rate Your Experience</h3>
            <p className="text-sm text-neutral-600">
              Hover over the stars to see the rating, then click to select
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <RatingStars
              value={rating}
              onChange={setRating}
              size="lg"
              showValue={true}
              showLabel={true}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-600">
              {rating === 0 ? "No rating selected" : `You rated this ${rating} out of 5 stars`}
            </p>
            {rating > 0 && (
              <button
                onClick={() => setRating(0)}
                className="mt-2 text-sm text-primary-600 hover:text-primary-700"
              >
                Clear rating
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
};
