export const phases = [
  {
    id: '597a09ac-2805-48db-ac5a-2960e66736a5',
    name: 'Foundation',
    status: 'COMPLETED'
  },
  {
    id: '5442ab2d-fb10-469b-9906-9986e435ce35',
    name: 'Discovery',
    status: 'ACTIVE'
  },
  {
    id: '9bc622ae-b389-4a17-bc1e-e3f064cbfdd3',
    name: 'Delivery',
    status: 'BLOCKED'
  }
]

export const tasks = [
  {
    id: 'e3509f6b-21e8-4764-bdcc-7eb7408b14d3',
    phaseId: '597a09ac-2805-48db-ac5a-2960e66736a5',
    title: 'Setup virtual office',
    isDone: true
  },
  {
    id: '70633d8d-9706-4c25-a4c1-121a7155eda5',
    phaseId: '597a09ac-2805-48db-ac5a-2960e66736a5',
    title: 'Set mission & vision',
    isDone: true
  },
  {
    id: '8e2a7951-712e-4638-a4d2-708722278dc3',
    phaseId: '597a09ac-2805-48db-ac5a-2960e66736a5',
    title: 'Select business name',
    isDone: true
  },
  {
    id: '4071f168-73a3-41aa-912f-5092344ae4c1',
    phaseId: '597a09ac-2805-48db-ac5a-2960e66736a5',
    title: 'Buy domains',
    isDone: true
  },
  {
    id: 'e1f992a5-e5d8-422e-97d5-bc1e2bd211ef',
    phaseId: '5442ab2d-fb10-469b-9906-9986e435ce35',
    title: 'Create roadmap',
    isDone: true
  },
  {
    id: '6f4c1aa4-d69f-4dd7-b9b2-41e0847dec41',
    phaseId: '5442ab2d-fb10-469b-9906-9986e435ce35',
    title: 'Competitor analysis',
    isDone: false
  },
  {
    id: '2293625d-9e33-4e3d-8933-0dfc5a19fe6f',
    phaseId: '9bc622ae-b389-4a17-bc1e-e3f064cbfdd3',
    title: 'Release marketing website',
    isDone: false
  },
  {
    id: '8d7ca09f-a13a-45a2-92bc-a2e100c0ab98',
    phaseId: '9bc622ae-b389-4a17-bc1e-e3f064cbfdd3',
    title: 'Release MVP',
    isDone: false
  }
]
