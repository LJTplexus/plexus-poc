import { PipesModule } from './pipes.module';

describe('PipesModule ', () => {
  let module: PipesModule;

  beforeEach(() => {
    module = new PipesModule();
  });

  it('should create module', () => {
    expect(module).toBeTruthy();
  });
});
