import { FAQS } from '@entities/faq/constant/breadCrump';
import DynamicBreadcrumbs from '@feature/dynamicBreadcrump';
// import FaqContent from '@widgets/faq/faq-content';

const PATH_MAP = {
  faq: FAQS,
};

const FaqPage = () => {
  return (
    <>
      <DynamicBreadcrumbs pathMap={PATH_MAP} />
      {/* <FaqContent /> */}
    </>
  );
};

export default FaqPage;
