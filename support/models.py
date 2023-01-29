# from uuid import uuid4
#
# from django.contrib.auth import get_user_model
# from django.db import models
# from django.urls import reverse
# from django.utils import timezone
#
#
#
#
# # Create your models here.
#
#
# class Problem(models.Model):
#     """
#     Problems and suggestions for solutions to the help center bot.
#     """
#
#     parent = models.ForeignKey(
#         "self",
#         default=None,
#         null=True,
#         blank=True,
#         related_name="nested_problem",
#         on_delete=models.CASCADE,
#     )
#     nesting_level = models.IntegerField(default=0)
#     name = models.CharField(max_length=50, verbose_name="اسم المشكلة")
#     result = models.TextField(null=True, blank=True, verbose_name="الحل")
#
#     def save(self, *args, **kwargs):
#         if self.parent:
#             self.nesting_level = self.parent.nesting_level + 1
#         super(Problem, self).save(*args, **kwargs)
#
#     def __str__(self):
#         if self.parent:
#             name = self.parent.__str__() + " -> " + self.name
#         else:
#             name = self.name
#         return str(name)
#
#     class Meta:
#         verbose_name = "مشكلة"
#         verbose_name_plural = "مشاكل مركز المساعدة"
#
#
# class Help(models.Model):
#     """
#     Help ticket.
#      The administration is not alerted unless the user requests help (need_help = True) and does not get help from the bot.
#     """
#
#     user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default="")
#     status = models.CharField(
#         choices=(("مفتوحة", "مفتوحة"), ("معلقة", "معلقة"), ("مغلقة", "مغلقة")),
#         max_length=20,
#         default="مفتوحة",
#         null=True,
#         blank=True,
#     )
#     date = models.DateTimeField(default=timezone.now)
#     nesting_levels = models.JSONField(null=True, blank=True)
#     need_help = models.BooleanField(default=True)
#     id = models.CharField(
#         primary_key=True,
#         unique=True,
#         default=uuid4,
#         editable=False,
#         max_length=10000,
#     )
#     end_date = models.DateTimeField(auto_now=True)
#     is_right = models.BooleanField(null=True, blank=True)
#
#     def __str__(self):
#         return str(self.user)
#
#     class Meta:
#         ordering = ("date",)
#         verbose_name = "تذكرة مساعدة"
#         verbose_name_plural = "تذاكر المساعدة"
#
#     @property
#     def problem_of_client(self):
#         problems = []
#         if self.nesting_levels:
#             for i in self.nesting_levels:
#                 problems.append(Problem.objects.get(id=self.nesting_levels.get(i)))
#         if len(problems) > 0:
#             return problems[-1]
#
#     def get_absolute_url(self):
#         return reverse("help:help", kwargs={"pk": self.id})