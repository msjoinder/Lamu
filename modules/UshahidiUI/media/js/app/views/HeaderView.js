/**
 * Header View
 *
 * @module     HeaderView
 * @author     Ushahidi Team <team@ushahidi.com>
 * @copyright  2013 Ushahidi
 * @license    https://www.gnu.org/licenses/agpl-3.0.html GNU Affero General Public License Version 3 (AGPL3)
 */

define(['marionette', 'handlebars', 'App', 'text!templates/Header.html', 'text!templates/partials/views-dropdown-nav.html'],
	function(Marionette, Handlebars, App, template, viewsDropdown)
	{
		// Hacky - make sure we register partials before we call compile
		Handlebars.registerPartial('views-dropdown-nav', viewsDropdown);
		
		return Marionette.ItemView.extend(
		{
			template : Handlebars.compile(template),
			initialize: function() {
				// @todo update this for real UI
				App.vent.on('page:change', this.updateActiveNav, this);
			},
			events : {
				'click .js-views-menu-link' : 'showViewsMenu',
				'click .js-create-post' : 'showCreatePost'
			},
			triggers : {
				'click .js-workspace-panel-button, .js-workspace-panel-button-small' : 'workspace:toggle'
			},
			updateActiveNav : function (page)
			{
				// De-activate all nav items
				this.$('nav[role="sub-navigation"]').removeClass('subnav');
				this.$('nav[role="sub-navigation"] ul li').removeClass('active');
				this.$('.js-sets-menu, .js-views-menu').removeClass('active');
				
				// Active current
				var pageSegments = page.split('/');
				// Ignore first segment for now
				
				if (pageSegments[0] === 'index')
				{
					this.$('.views-full').addClass('active');
				}
				else if (pageSegments[0] === 'views' && typeof pageSegments[1] !== 'undefined')
				{
					this.$('.views-'+pageSegments[1]).addClass('active');
				}
			},
			showViewsMenu : function(e)
			{
				e.preventDefault();
				// Hide other menu
				this.$('.js-sets-menu').removeClass('subnav');
				this.$('.js-sets-menu-link').removeClass('active');
				// Toggle this menu
				this.$('.js-views-menu').toggleClass('subnav');
				this.$('.js-views-menu-link').toggleClass('active');
			},
			showCreatePost : function (e)
			{
				e.preventDefault();
				App.vent.trigger('post:create');
			}
		});
	});