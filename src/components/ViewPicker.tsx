import {
  components,
  useAdaptableApi,
  useAdaptableState,
} from "@adaptabletools/adaptable-infinite-react";

const { Select } = components;
export function ViewPicker() {
  const views = useAdaptableState((state) => state.view.views);
  const currentViewId = useAdaptableState((state) => state.view.currentViewId);

  const api = useAdaptableApi();
  return (
    <div className="mr-5 place-self-end mb-1 ">
      <span className="mr-3">Select current view</span>
      <Select
        value={currentViewId}
        onChange={(value) => {
          api.viewApi.setActiveView(value);
        }}
        options={views.map((view) => {
          return {
            label: view.label,
            value: view.id,
          };
        })}
      />
    </div>
  );
}
