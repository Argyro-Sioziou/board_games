from django.urls import re_path

from . import views

app_name = 'djbg'

urlpatterns = [
    re_path('^games/?$', views.GameList.as_view()),
    re_path(r'^games/(?P<pk>\d+)/?$', views.GameDetail.as_view()),
    re_path('^tags/?$', views.TagList.as_view()),
    re_path('^reviews/?$', views.ReviewList.as_view()),
    re_path('^reviews/(?P<review_id>[0-9]+)/comments/?$', views.CommentList.as_view()),
    re_path(r'^games/(?P<game_id>[0-9]+)/reviews/?$',
            views.ReviewList.as_view()),
    re_path('^profiles/?$', views.ProfileList.as_view()),
    re_path('^users/?$', views.UserList.as_view()),
    re_path('^users/(?P<pk>\d+)/?$', views.UserDetail.as_view()),
    re_path('^pictures/?$', views.PictureGameList.as_view()),
    re_path('^games/(?P<game_id>[0-9]+)/pictures/?$', views.PictureGameList.as_view()),
]
