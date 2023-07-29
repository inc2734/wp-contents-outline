<?php
/**
 * Class SampleTest
 *
 * @package inc2734/wp-basis
 */

/**
 * @todo
 */
class SampleTest extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();
	}

	public function tear_down() {
		parent::tear_down();
	}

	/**
	 * @test
	 */
	public function sample() {
		$bootstrap = new Inc2734\WP_Contents_Outline\Bootstrap();

		$this->assertTrue( is_a( $bootstrap, 'Inc2734\WP_Contents_Outline\Bootstrap' ) );
	}
}
