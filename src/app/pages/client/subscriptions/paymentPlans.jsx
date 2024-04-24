import React from 'react';
import SubscriptionCard from '../../../components/subscriptionCards';

const PaymentPlansPage = () => {
  return (
    <div className="">
      <div className="w-100 max-w-10x1 grid h-96 grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
        <SubscriptionCard
          title="Basic"
          price="MWK 10,000"
          features={['Ability to view and rate recipes.', 'Access to 4 recipes.', 'Basic email notifications for subscription confirmation.']}
        />
        <SubscriptionCard
          title="Pro"
          price="MWK 20,000"
          features={['Advanced search and filtering capabilities for recipes.', 'Ability to rate, review, and save favorite recipes.', 'Email notifications for recipe recommendations.']}
        />
        <SubscriptionCard
          title="Premium"
          price="MWK 40,000"
          features={[
            'Offer nutrition analysis and meal planning.',
            'VIP access to exclusive recipes and culinary experiences.',
            'Unlimited video viewing.',
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentPlansPage;
