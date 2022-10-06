import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | jumbo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Jumbo />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Jumbo>
        template block text
      </Jumbo>
    `);

    assert.dom(this.element).hasText('template block text');
  });
  test('it renders', async function (assert) {
    test('it renders the content inside a jumbo header with a tomster', async function (assert) {
      await render(hbs`<Jumbo>Hello World</Jumbo>`);
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo').hasText('Hello World');
      assert.dom('.jumbo .tomster').exists();
    })
  })
});