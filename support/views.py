# from django.shortcuts import render
#
# # Create your views here.
# from django.contrib import messages
# from django.contrib.auth.decorators import login_required
# from django.contrib.auth.mixins import LoginRequiredMixin
# from django.shortcuts import redirect
# from django.views.generic import DetailView, ListView
#
# from support.models import Help, Problem
#
#
# ####################################################################################
#
#
# def send_help(help):
#     if help.status == "معلقة":
#         help.status = "مفتوحة"
#         help.need_help = True
#         help.save()
#         print(
#             f"قام {help.user} بفتح تذكرة مساعده", help.get_absolute_url()
#         )
#
#
# ####################################################################################
#
#
# class HelpTicketView(LoginRequiredMixin, DetailView):
#     model = Help
#     template_name = "help.html"
#     context_object_name = "ticket"
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["problems"] = Problem.objects.all()
#         context["parents"] = get_problems_parents()
#         return context
#
#     def post(self, request, *args, **kwargs):
#         if request.POST.get("status") == "close":
#             return self.close_ticket(request, self.get_object())
#         if request.user == self.get_object().user:
#             return self.set_problem(request, self.get_object())
#         return super().post(request, *args, **kwargs)
#
#     def close_ticket(self, request, obj):
#         if request.user.type == ADMIN_USER:
#             obj.is_right = request.POST.get("is_right")
#         obj.status = "مغلقة"
#         obj.save()
#
#
#         if request.user == obj.user:
#             return redirect("help:help-center")
#         return redirect(obj.get_absolute_url())
#
#     def set_problem(self, request, obj):
#         if obj.status == "معلقة":
#             nesting_levels = {}
#             # Determine the customer's problem through the options that he entered
#             for i in range(biggest_nesting_number() + 1):
#                 nesting_values = request.POST.getlist(f"problem_{i}", [])
#                 nesting_val = next(
#                     (problem_id for problem_id in nesting_values if problem_id), None
#                 )
#                 if Problem.objects.filter(id=nesting_val).exists():
#                     nesting_levels[i] = nesting_val
#             obj.need_help = True
#             obj.nesting_levels = nesting_levels
#             obj.save()
#             send_help(obj)
#         return redirect(obj.get_absolute_url())
#
#
# ####################################################################################
# @login_required()
# def create_help(request):
#     help = Help.objects.create(user=request.user, status="معلقة", need_help=False)
#     messages.success(request, "تم فتح تذكرة دعم فني بنجاح.")
#     return redirect("help:help", pk=help.id)
#
#
# ####################################################################################
# class HelpCenterView(LoginRequiredMixin, ListView):
#     template_name = "help_tickets.html"
#     context_object_name = "tickets"
#     paginate_by = 10
#
#     def get_queryset(self):
#         tickets = (
#             Help.objects.filter(
#                 user=self.request.user,
#                 status__icontains=self.request.GET.get("status", ""),
#             )
#             .exclude(status="معلقة")
#             .order_by("-date")
#         )
#
#         query = self.request.GET.get("search")
#         if query:
#             tickets = tickets.filter(id__icontains=query)
#
#         return tickets
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["title"] = "مركز الدعم"
#         return context